/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import {
  AccountUpdate,
  method,
  PrivateKey,
  SmartContract,
  UInt64,
  type PublicKey,
} from 'o1js';

import Depositable from './interfaces/tokenAccount/depositable.js';
import type Withdrawable from './interfaces/tokenAccount/withdrawable.js';
import Token from './token.js';

class TokenAccount extends SmartContract implements Withdrawable, Depositable {
  // eslint-disable-next-line no-warning-comments
  // TODO: replace with a getter/setter or some other way
  // of keeping it consistent across the smart contract lifecycle
  public tokenAddress: PublicKey = PrivateKey.random().toPublicKey();

  @method
  public withdraw(amount: UInt64): AccountUpdate {
    const token = new Token(this.tokenAddress);
    const [fromAccountUpdate] = token.transferFrom(
      this.address,
      amount,
      AccountUpdate.MayUseToken.InheritFromParent
    );
    return fromAccountUpdate;
  }

  @method
  public deposit(amount: UInt64): AccountUpdate {
    const token = new Token(this.tokenAddress);
    const [, toAccountUpdate] = token.transferTo(
      this.address,
      amount,
      AccountUpdate.MayUseToken.InheritFromParent
    );
    return toAccountUpdate;
  }
}

export default TokenAccount;