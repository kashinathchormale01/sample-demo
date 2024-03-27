export const settings =  [{
    "code": 1,
    "name": "Profile",
    "link": "/my-profile"
  },
  {
    "code": 2,
    "name": "Logout",
    "link": "/login"
  }];
  
  export const menuItemsData = [
      // ...
      {
        id: 1,
        section: 'My Details',
        icon: "settings",
        url: '/my-details',
        submenu: [
          {
            menu: 'My Profile',
            url: 'my-profile',
          },
          {
            menu: 'My Attendance',
            url: 'my-attendance',
          },
          {
            menu: 'My Payslip',
            url: 'my-payslip',
          },
        ],
      },
      {   id: 2,
          section: 'Team Management',
          url: '/team-manage',
          submenu: [
            {
              menu: 'Employee Details',
              url: 'employee-details',
            },
            {
              menu: 'Employee Payslip',
              url: 'employee-payslip',
            },
            {
              menu: 'Employee Attendance',
              url: 'employee-attendace',
            },
            {
              menu: 'Employee Register',
              url: 'employee-register',
            },
          ],
        },
        { id: 3,
          section: 'Finance',
          url: '/finance',
          submenu: [
            {
              menu: 'Bank Application',
              url: 'bank-application',
            },
            {
              menu: 'Employee PF validation',
              url: 'emp-pf-validation',
            },
            {
              menu: 'Contractor Billing',
              url: 'contractor-billing',
            },
            {
              menu: 'Loan/Recovery',
              url: 'loan',
            },
            {
              menu: 'Damage/Loss',
              url: 'damage-loss',
            },
          ],
        },
        {id: 4,
          section: 'Reports',
          url: '/reports',
          submenu: [
            {
              menu: 'Generate Wage Reports',
              url: 'generate-wage-reports',
            },
            {
              menu: 'Contractor Assignment',
              url: 'contractor-assignment',
            },
            {
              menu: 'SEO',
              url: 'seo',
            },
          ],
        },
        {id: 5,
          section: 'App Management',
          url: '/app-management',
          submenu: [
            {
              menu: 'Access Management',
              url: 'access-management',
            },
            {
              menu: 'Work Location Management',
              url: 'work-location-management',
            },
          ],
        },
      // ...
    ];
  