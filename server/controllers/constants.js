export const adminRequiredFields = [
  "name",
  "email",
  "password",
  "contact",
  "image",
  "role",
];

export const userRequiredFields = [...adminRequiredFields, "branch"];

export const certificationRequiredFields = [
  "name",
  "issuer",
  "certificateId",
  "student",
  "issueDate",
  "tags",
  "link",
];

export const internshipRequiredFields = [
  "companyName",
  "student",
  "internshipDomain",
  "branch",
  "role",
  "stipend",
  "offerLetter",
  "startDate",
  "endDate",
  "internshipType",
  "completionCertificate",
];

export const courseRequiredFields = [
  "courseName",
  "student",
  "coursePlatform",
  "completionStatus",
  "startDate",
  "tags",
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
  "image",
  "passoutYear",
];
export const jobDriveRequiredFields = [
  "salary",
  "eligibleBranches",
  "companyName",
  "category",
  "roles",
  "offerType",
  "lastDate",
  "description",
  "jobLocation",
  "skills",
];

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
};
