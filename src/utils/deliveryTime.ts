/**
 * 이전 배달 소요시간으로 예상 배달시간을 계산하는 함수
 * 예상 배달 시간은 이전 배달소요시간 평균의 올림
 * 배달 소요시간이 없는경우 기본값 2일
 *
 * @param dateArr 이전 배달 소요시간 배열
 * @returns 예상 소요시간 (단위 : 일)
 */

export const deliveryTime = (dateArr: number[]): number => {
  const defaultDate = 2;
  if (dateArr.length === 0) {
    return defaultDate;
  } else {
    const sumDate = dateArr.reduce((acc, date) => acc + date);
    const average = sumDate / dateArr.length;

    return Math.ceil(average);
  }
};
