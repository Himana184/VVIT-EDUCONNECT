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
