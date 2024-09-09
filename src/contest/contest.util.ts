interface ContestId {
  contestId: string;
}

export const DeleteContest = (ids: ContestId[]): { contestId: string }[] => {
  return ids.map((item) => ({
    contestId: item.contestId,
  }));
};
