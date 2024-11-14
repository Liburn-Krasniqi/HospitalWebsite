const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Hospital Website API',
          description: "API endpoints for a Hospital Website",
          contact: {
            name: "Liburn Krasniqi",
            email: "krasniqiliburn@gmail.com",
            url: "https://github.com/Liburn-Krasniqi/HospitalWebsite"
          },
          version: '1.0.0',
        },
        servers: [
          {
            url: "http://localhost:5000/",
            description: "Local server"
          },
        //   {
        //     url: "<your live url here>",
        //     description: "Live server"
        //   },
        ]
      },
      // looks for configuration in specified directories
      apis: ['./Server/routes/*.js'],
    }

    const swaggerSpec = swaggerJsdoc(options)
    exports.swaggerDocs = (app, port) => {
      // Swagger Page
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
      // Documentation in JSON format
      // app.get('/docs.json', (req, res) => {
      //   res.setHeader('Content-Type', 'application/json')
      //   res.send(swaggerSpec)
      // })
    }
