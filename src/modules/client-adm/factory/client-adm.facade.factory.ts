import ClientRepository from "../repository/client.respository";
import FindClientByIdUsecase from "../usecase/find-by-id/find-by-id.usecase";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "../facade/client-adm.facade";


export default class ClientAdmFacadeFactory {
    static create() {
        const clientRepository = new ClientRepository();
        const addClientUsecase = new AddClientUsecase(clientRepository);
        const findClientByIdUsecase = new FindClientByIdUsecase(clientRepository);
        return new ClientAdmFacade({
            addUsecase: addClientUsecase,
            findByIdUsecase: findClientByIdUsecase,
        });
    }
}