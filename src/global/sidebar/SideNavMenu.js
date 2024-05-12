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
      {
        menu: "Employee Details",
        url: "employee-details",
      },
      {
        menu: "Employee Payslip",
        url: "employee-payslip",
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
        menu: "Employee PF validation",
        url: "emp-pf-validation",
      },
      {
        menu: "Contractor Billing",
        url: "contractor-billing",
      },
      {
        menu: "Loan/Recovery",
        url: "loan",
      },
      {
        menu: "Damage/Loss",
        url: "damage-loss",
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
        url: "generate-wage-reports",
      },
      {
        menu: "Generate Wage Slips",
        url: "generate-wage-slip",
      },
      {
        menu: "Contractor Assignment",
        url: "contractor-assignment",
      },
      {
        menu: "SEO",
        url: "seo",
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
        menu:"User Promoted List",
        url:"user-promoted-list"
      },
      {
        menu:"User Password Reset",
        url:"user-password-reset"
      },
      {
        menu: "User Management",
        url: "user-management",
      },
      {
        menu: "Role Management",
        url: "designation-management",
      },
    ],
  },
  // ...
];
