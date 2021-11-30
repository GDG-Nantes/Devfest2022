export interface ITeam {
  bureau: ITeamMember[];
}

export interface ITeamMember {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  socials: ISocials;
}

export interface ISocials {
  twitter: string;
  linkedin: string;
  github: string;
}
