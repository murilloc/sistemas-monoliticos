import PaymentFacadeInterface from "./facade.interface";
import {PaymentFacadeInputDto, PaymentFacadeOutputDto} from "./payment.facade.dto";
import UseCaseInterface from "../../@shared/usecase/usecase.interface";

export default class PaymentFacade implements PaymentFacadeInterface {

    constructor(private processPaymentUsecase: UseCaseInterface) {
    }

    async processPayment(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this.processPaymentUsecase.execute(input);
    }
}