import app from './app';

app.listen(process.env.PORT || 3000, () => {
   console.log('Iniciou o server com sucesso');
});
