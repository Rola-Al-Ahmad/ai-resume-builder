export default {
    firstName: 'Rola',
    lastName: 'Al-Ahmad',
    jobTitle: 'full stack developer',
    address: 'Beirut, Lebanon',
    phone: '71 111 111',
    email: 'exmaple@gmail.com',
    themeColor: "#3385ed",
    summery: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    experience: [
        {
            id: 1,
            title: 'Full Stack Developer',
            companyName: 'Amazon',
            city: 'New York',
            state: 'NY',
            startDate: 'Jan 2023',
            endDate: '',
            currentlyWorking: true,
            // workSummery: [
            //     'Designed, developed, and maintained full-stack applications using React and Node.js.',
            //     'Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.',
            //     'Maintained the React Native in-house organization application.',
            //     'Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.'
            // ]
            workSummery: '<li>Designed, developed, and maintained full-stack applications using React and Node.js.</li>' + 
                '<li>Implemented responsive user interfaces with React, ensuring seamless user experiences across\n' +
                'various devices and browsers.</li>' +
                '<li>Maintaining the React Native in-house organization application.</li>' +
                '<li>CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end' +
                'and back-end systems.</li>'
        },
        {
            id: 2,
            title: 'Frontend Developer',
            companyName: 'Google',
            city: 'Charlotte',
            state: 'NC',
            startDate: 'May 2019',
            endDate: 'Jan 2021',
            currentlyWorking: false,
            // workSummery: [
            //     'Designed, developed, and maintained full-stack applications using React and Node.js.',
            //     'Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.',
            //     'Maintained the React Native in-house organization application.',
            //     'Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.'
            // ]
            workSummery: '<li>Designed, developed, and maintained full-stack applications using React and Node.js.</li>' + 
                '<li>Implemented responsive user interfaces with React, ensuring seamless user experiences across\n' +
                'various devices and browsers.</li>' +
                '<li>Maintaining the React Native in-house organization application.</li>' +
                '<li>CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end' +
                'and back-end systems.</li>'
        }
    ],
    education: [
        {
            id: 1,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2018',
            endDate: '',
            degree: 'Master',
            currentlyStudying: true,
            major: 'Computer Science',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        },
        {
            id: 2,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2018',
            endDate: 'Dec 2019',
            degree: 'Master',
            currentlyStudying: false,
            major: 'Computer Science',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        }
    ],
    skills: [
        {
            id: 1,
            name: 'Angular',
            rating: 80,
        },
        {
            id: 1,
            name: 'React',
            rating: 100,
        },
        {
            id: 1,
            name: 'MySql',
            rating: 80,
        },
        {
            id: 1,
            name: 'React Native',
            rating: 100,
        }
    ]
}