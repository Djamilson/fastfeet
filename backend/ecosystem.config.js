module.exports = {
  apps: [
    {
      name: 'fastfeet',
      script: './src/server.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
