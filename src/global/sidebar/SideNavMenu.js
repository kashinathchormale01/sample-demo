export const userRoles = [
  {
    code: 1,
    name: "Super Admin",
  },
  {
    code: 2,
    name: "Admin",
  },
  {
    code: 3,
    name: "Data Entry Operator",
  },
  {
    code: 4,
    name: "Supervisor",
  },
];

export const settings = [
  {
    code: 1,
    name: "Profile",
    link: "/my-profile",
  },
  {
    code: 2,
    name: "Logout",
    link: "/login",
  },
];

export const menuItemsData = [
  // ...
  {
    sectionId: 1,
    userAccess:[1,2,3,4,5],
    section: "My Details",
    icon: "settings",
    url: "/my-details",
    submenu: [
      {
        menu: "My Profile",
        url: "my-profile",
      },
      {
        menu: "My Attendance",
        url: "my-attendance",
      },
      {
        menu: "My Payslip",
        url: "my-payslip",
      },
    ],
  },
  {
    sectionId: 2,
    userAccess:[1,2,3,4,5],
    section: "Team Management",
    url: "/team-manage",
    submenu: [
      // {
      //   menu: "Employee Details",
      //   url: "employee-details",
      // },
      
      {
        menu: "Employee Attendance",
        url: "employee-attendance",
      },
      {
        menu: "Employee Register",
        url: "employee-register",
      },      
      {
        menu: "Employee List",
        url: "employee-list",
      },     
    ],
  },
  {
    sectionId: 3,
    userAccess:[1,2,3,5],
    section: "Finance",
    url: "/finance",
    submenu: [
      {
        menu: "Bank Application",
        url: "bank-application",
      },
      {
        menu: "Generate Employee Bill",
        url: "generate-bill",
      },
      
      {
        menu:"Update Rate Chart",
        url:"rate-chart"
      },
      {
        menu: "Employee Payslip",
        url: "emp-payslips",
      },     
    ],
  },
  {
    sectionId: 4,
    userAccess:[1,2,3,5],
    section: "Reports",
    url: "/reports",
    submenu: [      
      {
        menu: "Generate Wage Slips",
        url: "view-wage-bill",
      },     
      {
        menu: "Generate Bill",
        url: "generate-bill",
      },
      {
        menu: "View Bill",
        url: "view-bill",
      },
      {
        menu: "Show Wage Reports",
        url: "show-bill",
      },
    ],
  },
  {
    sectionId: 5,
    userAccess:[1,2],
    section: "App Management",
    url: "/app-management",
    submenu: [
      {
        menu: "Access Management",
        url: "access-management",
      },
      {
        menu: "Work Location Management",
        url: "work-location-management",
      },
      {
        menu: "Role Management",
        url: "designation-management",
      },
    ],
  },
  {
    sectionId: 6,
    userAccess:[1,2],
    section: "User Management",
    url: "/user-management",
    submenu: [
      {
        menu: "User Promote",
        url: "user-promote",
      },      
      {
        menu:"User Password Reset",
        url:"user-promoted-list"
      },
      {
        menu: "Employee Inactive List",
        url: "employee-inactive-list",
      },
      {
        menu: "Employee Exit",
        url: "employee-exit",
      },
    ],
  },
];
