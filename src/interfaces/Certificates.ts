export interface FileCertificate {
  name: string;
  id: string;
}

export interface UserCertificate {
  firstName: string;
  lastName: string;
  id: string;
  url: string;
}

export interface StudentCertificate {
  id: string;
  fileName: string;
  url: string;
  type: "approval" | "accreditation" | "other" ;
}
