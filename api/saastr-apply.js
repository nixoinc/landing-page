export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, linkedin, company, education, stack, comp, availability, targetStage, customerFacing, customerContext, shipped } = req.body;

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: '35d6135f-acbe-81a2-ba94-f798ebbb8505' },
      properties: {
        'Name': { title: [{ text: { content: name || '' } }] },
        'Email': { email: email || null },
        'LinkedIn': { url: linkedin || null },
        'Company + Tenure': { rich_text: [{ text: { content: company || '' } }] },
        'Education': { rich_text: [{ text: { content: education || '' } }] },
        'Tech Stack': { rich_text: [{ text: { content: stack || '' } }] },
        'Compensation': { rich_text: [{ text: { content: comp || '' } }] },
        'Availability': { rich_text: [{ text: { content: availability || '' } }] },
        'Target Company Stage': { rich_text: [{ text: { content: targetStage || '' } }] },
        'Customer Facing': { select: customerFacing ? { name: customerFacing } : null },
        'Customer Context': { rich_text: [{ text: { content: customerContext || '' } }] },
        'Most Interesting Ship': { rich_text: [{ text: { content: shipped || '' } }] },
        'Submitted At': { date: { start: new Date().toISOString() } },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    return res.status(500).json({ error: err.message });
  }

  return res.status(200).json({ status: 'success' });
}
