
const TestPage = async () => {
  console.log(`${process.env.META_APP_ID}|${process.env.META_APP_SECRET}`);
  
  const url = `https://graph.instagram.com/me/media?fields=id,captions,media_url,timestamp,media_type,permalink&access_token=${process.env.META_APP_ID}|${process.env.META_APP_SECRET}`;
  const data = await fetch(url)
  const json = await data.json();
  console.log(JSON.stringify(json, null, 2));
  return <div>Test Page</div>
}

export default TestPage