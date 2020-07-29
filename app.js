//const fs = require('fs');
//const generatePage = require('./src/page-template.js');
//const profileDataArgs = process.argv.slice(2);
//const [name, github] = profileDataArgs;



//fs.writeFile('index.html', generatePage(name,github), err => {
   // if (err) throw err;
    //console.log('Portfolio complete! Check out index.html to see the output!');
//})

const inquirer = require ('inquirer')

const promptUser = () => {
    
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is your name?"
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username'
    },
    {
        type: 'input',
        name: 'about',
        message: 'provide some information about yourself:'
    }
])
};
const promptProject = (portfolioData) => {
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    };
    console.log(`
    =================
    Add a New Project
    =================`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)"
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you create this project with? (Check all that apply)",
            choices: ['Javascipt', "HTML", "CSS", "ES6", "jquery", "bootstrap", "node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the Github link to your project. (Required)"
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            deafult: false

        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
        
    });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
})


