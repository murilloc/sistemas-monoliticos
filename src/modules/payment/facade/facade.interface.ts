import {PaymentFacadeInputDto, PaymentFacadeOutputDto} from "./payment.facade.dto";

export default interface PaymentFacadeInterface {
    processPayment(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}