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
    section: "Team Management",
    url: "/team-manage",
    submenu: [
      // {
      //   menu: "Employee Details",
      //   url: "employee-details",
      // },
      {
        menu: "Employee Payslip",
        url: "view-bill",
      },
      {
        menu: "Employee Attendance",
        url: "employee-attendance",
      },
      {
        menu: "Employee Register",
        url: "employee-register",
      },
      {
        menu: "Employee Exit",
        url: "employee-exit",
      },
      {
        menu: "Employee List",
        url: "employee-list",
      },
      {
        menu: "Employee Inactive List",
        url: "employee-inactive-list",
      },
    ],
  },
  {
    sectionId: 3,
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
    ],
  },
  {
    sectionId: 4,
    section: "Reports",
    url: "/reports",
    submenu: [
      {
        menu: "Generate Wage Reports",
        url: "view-bill",
      },
      {
        menu: "Generate Wage Slips",
        url: "view-bill",
      },     
      {
        menu: "Generate Bill",
        url: "generate-bill",
      },
      {
        menu: "View Bill",
        url: "view-bill",
      },
    ],
  },
  {
    sectionId: 5,
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
        menu: "User Promote",
        url: "user-promote",
      },      
      {
        menu:"User Password Reset",
        url:"user-promoted-list"
      },      
      {
        menu: "Role Management",
        url: "designation-management",
      },
    ],
  },
];
