import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { productEdit } from "../../redux/slice/productsSlice";
import { ProductType } from "../../types/productTypes";
import { checkCouponApplied } from "../../utils/checkCouponApplied";
import { transformStringToArr } from "../../utils/transformStringToArr";
import { transformStringToNum } from "../../utils/transformStringToNum";

export interface FormValue {
  product_no: string;
  product_name: string;
  description: string;
  price: string;
  main_image_url: string;
  prev_delivery_times: string;
  maximum_quantity: string;
  available_coupon: string;
}

interface EditProductProps {
  id: number;
  closeModal: () => void;
}

export default function EditProduct({ id, closeModal }: EditProductProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onChange" });

  const onSubmit = (data: FormValue) => {
    let prevDeliveryArr = transformStringToArr(data.prev_delivery_times);

    let numberPrice = transformStringToNum(data.price);

    let numberQuantity = transformStringToNum(data.maximum_quantity);

    let numberProductNo = transformStringToNum(data.product_no);

    let couponCheck = checkCouponApplied(data.available_coupon);

    let transformedData: ProductType = {
      ...data,
      available_coupon: couponCheck,
      product_no: numberProductNo,
      maximum_quantity: numberQuantity,
      price: numberPrice,
      prev_delivery_times: prevDeliveryArr,
    };

    dispatch(
      productEdit({ id: id, product: transformedData, closeModal: closeModal })
    );
  };
  return (
    <StContainer>
      <StTitles>상품 수정</StTitles>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <StLabel $error={errors.product_name !== undefined}>상품명</StLabel>
        <StInput
          {...register("product_name", {
            required: "이름을 입력하세요",
            maxLength: { value: 20, message: "20글자 이내로 작성하세요" },
          })}
        />
        {errors.product_name && errors.product_name.type === "required" && (
          <StErrorMessage>{errors.product_name.message}</StErrorMessage>
        )}
        {errors.product_name && errors.product_name.type === "maxLength" && (
          <StErrorMessage>{errors.product_name.message}</StErrorMessage>
        )}

        <StLabel $error={errors.product_no !== undefined}>상품번호</StLabel>
        <StInput
          {...register("product_no", {
            required: "상품번호를 입력하세요",
            pattern: /^\d{6}$/,
          })}
        />
        {errors.product_no && errors.product_no.type === "required" && (
          <StErrorMessage>{errors.product_no.message}</StErrorMessage>
        )}
        {errors.product_no && errors.product_no.type === "pattern" && (
          <StErrorMessage>여섯자리 숫자로 입력하세요</StErrorMessage>
        )}

        <StLabel $error={errors.prev_delivery_times !== undefined}>
          이전 배송일 (띄어쓰기로 구분)
        </StLabel>
        <StInput
          {...register("prev_delivery_times", {
            pattern: /^(\d+( \d+)*)?$/,
          })}
        />
        {errors.prev_delivery_times &&
          errors.prev_delivery_times.type === "pattern" && (
            <StErrorMessage>배송일을 띄어쓰기로 구분하세요</StErrorMessage>
          )}

        <StLabel $error={errors.price !== undefined}>가격</StLabel>
        <StInput
          {...register("price", {
            required: "가격을 입력하세요",
            pattern: /^\d+$/,
          })}
        />
        {errors.price && errors.price.type === "required" && (
          <StErrorMessage>{errors.price.message}</StErrorMessage>
        )}
        {errors.price && errors.price.type === "pattern" && (
          <StErrorMessage>숫자만 입력하세요</StErrorMessage>
        )}

        <StLabel $error={errors.main_image_url !== undefined}>
          이미지 URL
        </StLabel>
        <StInput
          {...register("main_image_url", {
            required: "이미지 URL을 입력하세요",
          })}
        />
        {errors.main_image_url && errors.main_image_url.type === "required" && (
          <StErrorMessage>{errors.main_image_url.message}</StErrorMessage>
        )}

        <StLabel $error={errors.description !== undefined}>상품 설명</StLabel>
        <StTextarea
          {...register("description", {
            required: "상품 설명을 입력하세요",
            maxLength: { value: 20, message: "20글자 이내로 작성하세요" },
          })}
        />
        {errors.description && errors.description.type === "required" && (
          <StErrorMessage>{errors.description.message}</StErrorMessage>
        )}
        {errors.description && errors.description.type === "maxLength" && (
          <StErrorMessage>{errors.description.message}</StErrorMessage>
        )}

        <StLabel $error={errors.maximum_quantity !== undefined}>
          최대 구매 수량
        </StLabel>
        <StInput
          {...register("maximum_quantity", {
            required: "최대 구매 수량을 입력하세요",
            pattern: /^\d+$/,
          })}
        />
        {errors.maximum_quantity &&
          errors.maximum_quantity.type === "required" && (
            <StErrorMessage>{errors.maximum_quantity.message}</StErrorMessage>
          )}
        {errors.maximum_quantity &&
          errors.maximum_quantity.type === "pattern" && (
            <StErrorMessage>숫자만 입력하세요</StErrorMessage>
          )}
        <StLabel>쿠폰 적용 여부</StLabel>
        <StButtonWrap>
          <StRadioInput
            id="true"
            value="true"
            type="radio"
            {...register("available_coupon")}
          />
          <StRadioLabel htmlFor="true">가능</StRadioLabel>
          <StRadioInput
            id="false"
            value="false"
            type="radio"
            {...register("available_coupon")}
          />
          <StRadioLabel htmlFor="false">불가능</StRadioLabel>
        </StButtonWrap>
        <StButtonWrap $mg_t="2rem">
          <StButton>제출</StButton>
          <StButton onClick={closeModal}>닫기</StButton>
        </StButtonWrap>
      </StForm>
    </StContainer>
  );
}
const StContainer = styled.div`
  background-color: white;
  width: 20rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const StTitles = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StLabel = styled.label<{ $error?: boolean }>`
  ${(props) => props.$error && "color:red"};
  margin-top: 1.5rem;
`;

const StInput = styled.input`
  width: 100%;
  margin: 0.2rem 0;
`;

const StTextarea = styled.textarea`
  width: 100%;
`;

const StErrorMessage = styled.p`
  color: red;
`;

const StButton = styled.button`
  padding: 0.2rem 1rem;
  margin: 0 1rem;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--color-btn);
  font-size: 1.2rem;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const StRadioInput = styled.input`
  display: none;
  &:checked + label {
    opacity: 1;
  }
`;

const StRadioLabel = styled.label`
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  margin: 0 1rem;
  color: white;
  background-color: var(--color-btn);
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const StButtonWrap = styled.div<{ $mg_t?: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  ${(props) => props.$mg_t && `margin-top:${props.$mg_t}`}
`;
