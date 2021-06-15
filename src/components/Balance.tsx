import React, { useState, useEffect } from 'react';
import {Input} from 'baseui/input';
import { Button } from 'baseui/button';
import {styled, useStyletron} from 'baseui';

const Label = styled('label', {
  width: "200px"
})

function Balance(props) {
    const [css, theme] = useStyletron();
    const [address, setAddress] = useState('')
  
    const onSubmit = () => {
      if(address.length > 0) props.onRequestBalance(address);
    }
  
    return (
      <div>
        <h3>Get Balance Of</h3>
        <div>
            <div className={css({display: "flex", margin: "1rem 0"})}>
            <Label>📨 Address:</Label>
            <Input
                value={address}
                onChange={ e => setAddress(e.currentTarget.value)}
                placeholder="0x.."
                overrides={{
                Root: {
                    style: {

                    },
                },
                }}
            />
            </div>            
            <p>Balance: {props.balance}</p>
            <Button onClick={onSubmit}>Get Balance</Button>
        </div>
      </div>
    )
  }
  
  export default Balance