import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const result = await this.findOne({
      where: {
        token,
      },
    });
    return result;
  }

  public async findByUserId(user_id: string): Promise<UserToken | undefined> {
    const result = await this.findOne({
      where: {
        user_id,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return result;
  }

  public async generateToken(user_id: string): Promise<string> {
    const result = await this.create({
      user_id,
    });

    await this.save(result);
    return result.token;
  }
}

export default UserTokenRepository;
