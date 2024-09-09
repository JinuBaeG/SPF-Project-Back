import client from "../client";

export default {
  Facility: {
    tutor: ({ id }: { id: string }) => {
      return client.tutor.findMany({
        where: {
          facility: {
            some: {
              id,
            },
          },
        },
      });
    },
    group: ({ id }: { id: string }) => {
      return client.group.findMany({
        where: {
          facility: {
            some: {
              id,
            },
          },
        },
      });
    },
    facilityImage: ({ id }: { id: string }) => {
      return client.facilityImage.findMany({
        where: {
          facility: {
            some: {
              id,
            },
          },
        },
      });
    },
    facilitySports: ({ id }: { id: string }) => {
      return client.facilitySports.findMany({
        where: {
          facility: {
            some: {
              id,
            },
          },
        },
      });
    },
    facilityInfo: ({ id }: { id: string }) => {
      return client.facilityInfo.findMany({
        where: {
          facility: {
            some: {
              id,
            },
          },
        },
      });
    },
    facilityTag: ({ id }: { id: string }) => {
      return client.facilityTag.findMany({
        where: {
          facility: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
