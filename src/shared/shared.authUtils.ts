// authUtils.ts

interface LoggedInUser {
    id: string;
    [key: string]: any; // 추가 속성이 있을 경우 확장 가능
  }
  
  /**
   * loggedInUser가 있는지 확인하는 유틸 함수.
   * @param loggedInUser - 현재 로그인한 사용자 객체.
   * @returns loggedInUser가 없는 경우 에러를 반환.
   */
  export const checkLoggedInUser = (loggedInUser: LoggedInUser | null | undefined) => {
    if (!loggedInUser) {
      return {
        ok: false,
        error: "로그인이 필요합니다.",
      };
    }
    return null;
  };
  