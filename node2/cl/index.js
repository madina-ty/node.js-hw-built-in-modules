const http = require('http');
const url = require('url');

const users = [
  { id: 0, name: "Greg" },
  { id: 1, name: "Anna" }
];

const news = [
  { id: 'news1', name: 'Путин приехал с официальным визитом в КЗ' },
  { id: 'news2', name: 'Беларусам отключили интернет' }
];

const htmlContent = {
  '2': 'HTML - это скелет вашего веб-сайта, определяющий его структуру и содержание.'
};

const cssContent = {
  '3': 'CSS же - это одежда, которая надевается на этот скелет, придавая ему стиль и внешний вид.'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); 
  const { pathname, query } = parsedUrl;

  res.writeHead(200, { 'Content-Type': 'application/json' });

  switch (pathname) {
    case '/':
      res.end(JSON.stringify({ message: 'Welcome to the API' }));
      break;
    case '/users':
      if (query.id) {
        const user = users.find(u => u.id === parseInt(query.id));
        res.end(JSON.stringify(user || { error: 'User not found' }));
      } else if (query.name) {
        const user = users.find(u => u.name.toLowerCase() === query.name.toLowerCase());
        res.end(JSON.stringify(user || { error: 'User not found' }));
      } else {
        res.end(JSON.stringify(users));
      }
      break;
    case '/news':
      if (query.id) {
        const newsItem = news.find(n => n.id === query.id);
        res.end(JSON.stringify(newsItem || { error: 'News not found' }));
      } else {
        res.end(JSON.stringify(news));
      }
      break;
    case '/html':
      if (query.id && htmlContent.hasOwnProperty(query.id)) {
        res.end(JSON.stringify({ content: htmlContent[query.id] })); 
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'HTML content not found' }));
      }
      break;
    case '/css': 
      if (query.id && cssContent.hasOwnProperty(query.id)) {
        res.end(JSON.stringify({ content: cssContent[query.id] })); 
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'CSS content not found' }));
      }
      break;
    default:
      res.writeHead(404);
      res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});