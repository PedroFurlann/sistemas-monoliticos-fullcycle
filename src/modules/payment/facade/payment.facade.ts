import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { ProcessPaymentOutputDto } from "../usecase/process-payment/process-payment.dto";
import PaymentFacadeInterface, {
  ProcessPaymentFacadeInputDto,
} from "./payment.facade.interface";

export interface UseCasesProps {
  processPaymentUseCase: UseCaseInterface;
}

export default class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase: UseCaseInterface;

  constructor(props: UseCasesProps) {
    this._processPaymentUseCase = props.processPaymentUseCase;
  }

  async processPayment(
    input: ProcessPaymentFacadeInputDto
  ): Promise<ProcessPaymentOutputDto> {
    return this._processPaymentUseCase.execute(input);
  }
}
