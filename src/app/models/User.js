import Sequelize,{ Model } from 'sequelize';

class User extends Model {
    static init(sequelize){
        //Classe pai extends
        //Colunas que serão inseridas pelo usuário
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        }
    ); 
}
}

export default User;