import Sequelize,{ Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize){
        //Classe pai extends
        //Colunas que serão inseridas pelo usuário
        //São campos que o usuário pode preencher qunado o usuário utilizar
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        }
        ); 

        this.addHook('beforeSave', async (user) => { //Criptografia de senhas. pega a senha do campo password, encripta e passa para o password_hash
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        });

        return this;
    }

    checkPassword(password){
        return bcrypt.compare( password, this.password_hash); // this tem acesso a todas as informações da classe, assim, consegue comparar entre os parametros.
        //retorna True || False
    }
}

export default User;