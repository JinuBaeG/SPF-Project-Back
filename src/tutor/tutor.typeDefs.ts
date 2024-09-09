import { gql } from "graphql-tag";

export default gql`
  type Tutor {
    id: String
    user: User
    name: String
    discription: String
    sidoName: String
    gusiName: String
    dongEubMyunName: String
    riName: String
    roadName: String
    buildingNumber: String
    zipcode: String
    activeArea: String
    address: String
    addrRoad: String
    addAddr: String
    areaLatitude: String
    areaLongitude: String
    tutorImage: TutorImage
    group: [Group]
    facility: [Facility]
    tutorInfo: [TutorInfo]
    tutorTag: [TutorTag]
    tutorInquiry: [TutorInquiry]
    tutorSportsEvent: [TutorSportsEvent]
    isJoin: Boolean
    tutorPresident: TutorPresident
    isPresident: Boolean
    userCount: Int
    maxMember: Int
    createdAt: String!
    updatedAt: String!
  }

  type RequestAddTutor {
    id: String!
    user: User
    title: String
    discription: String
    createdAt: String
    updatedAt: String
  }

  type TutorSportsEvent {
    id: String!
    name: String
    tutorId: Tutor
    createdAt: String!
    updateAt: String!
  }

  type TutorImage {
    id: String!
    imagePath: String
    tutorId: Tutor
    createdAt: String!
    updateAt: String!
  }

  type TutorInfo {
    id: String!
    tutor: Tutor
    discription: String
    awardDate: String
    createdAt: String!
    updatedAt: String!
  }

  type TutorTag {
    id: String!
    name: String
    imagePath: String
    tutor: [Tutor]
    createdAt: String!
    updatedAt: String!
  }

  type TutorInquiry {
    id: String!
    tutor: Tutor
    user: User
    inquiryTitle: String
    inquiryDiscription: String
    inquiryResponse: Boolean
    tutorInquiryComment: [TutorInquiryComment]
    createdAt: String!
    updatedAt: String!
  }

  type TutorInquiryComment {
    id: String!
    user: User
    tutor: Tutor
    tutorInquiry: TutorInquiry
    responseTitle: String
    responseDiscription: String
    answerOk: Boolean
    createdAt: String!
    updatedAt: String!
  }

  type TutorPresident {
    id: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    tutors: [Tutor]
    tutor(id: String!): Tutor
  }
`;
