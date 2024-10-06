import Client from "../domail/client.entity";

export default interface ClientGateway {
    add(input: Client): Promise<void>;

    findById(id: string): Promise<Client>;

}