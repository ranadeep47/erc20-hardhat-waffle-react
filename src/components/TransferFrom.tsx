import React, { useState, useEffect } from 'react';
import {Input} from 'baseui/input';
import { Button } from 'baseui/button';
import {styled, useStyletron} from 'baseui';

const Label = styled('label', {
  width: "200px"
})

function TransferFrom(props) {
    const [css, theme] = useStyletron();
    const [owner, setOwner] = useState('');
    const [receiver, setReceiver] = useState('');    
    const [amount, setAmount] = useState('');
  
    const onSubmit = () => {
      props.onTransferFromRequest(owner, receiver, amount);
    }
  
    return (
      <div>
        <h3>Transfer From:</h3>
        <div>
          <div className={css({display: "flex", margin: "1rem 0"})}>
            <Label>📨 Owner Address:</Label>
            <Input
              value={owner}
              onChange={ e => setOwner(e.currentTarget.value)}
              placeholder="0x.."
              overrides={{
                Root: {
                  style: {

                  },
                },
              }}
            />
          </div>
          <div className={css({display: "flex", margin: "1rem 0"})}>
            <Label>📨 Receiver Address:</Label>
            <Input
              value={receiver}
              onChange={ e => setReceiver(e.currentTarget.value)}
              placeholder="0x.."
              overrides={{
                Root: {
                  style: {

                  },
                },
              }}
            />
          </div>
          <div className={css({display: "flex"})}>
            <Label>💰 Amount:</Label>
            <Input
              value={amount}
              onChange={ e => setAmount(e.currentTarget.value)}          
              placeholder="10"
              overrides={{
                Root: {
                  style: {

                  },
                },
              }}
            />
          </div>
          <Button onClick={onSubmit}>Transfer</Button>
        </div>
      </div>
    )
  }
  
  export default TransferFrom