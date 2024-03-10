export const adminRequiredFields = [
  "name",
  "email",
  "password",
  "contact",
  "role",
];

export const userRequiredFields = [...adminRequiredFields, "branch"];

export const certificationRequiredFields = [
  "name",
  "issuer",
  "certificateId",
  "issueDate",
  "tags",
];

export const internshipRequiredFields = [
  "companyName",
  "internshipDomain",
  "role",
  "stipend",
  "startDate",
  "endDate",
  "internshipType",
];

export const courseRequiredFields = [
  "courseName",
  "coursePlatform",
  "courseLink",
  "completionStatus",
  "startDate",
];

export const announcementRequiredFields = [
  "title",
  "description",
  "category",
  "branches",
  "priority",
];

export const studentRequiredFields = [
  "name",
  "rollNumber",
  "collegeMail",
  "personalMail",
  "password",
  "contact",
  "branch",
  "section",
  "passoutYear",
];
export const queryRequiredFields = [
  "title",
  "description",
  "category",
  "student",
  "branch",
];
export const jobDriveRequiredFields = [
  "companyName",
  "roles",
  "categories",
  "jobLocation",
  "lastDate",
  "salary",
  "skills",
  "eligibleBranches",
  "description",
  "companyLogo",
];

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
};
