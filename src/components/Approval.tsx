import React, { useState, useEffect } from 'react';
import {Input} from 'baseui/input';
import { Button } from 'baseui/button';
import {styled, useStyletron} from 'baseui';
import {FlexGridItem} from 'baseui/flex-grid';


const Label = styled('label', {
  width: "200px"
})

function Approval(props) {
    const [css, theme] = useStyletron();
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
  
    const onSubmit = () => {      
      props.onRequestApproval(address, amount);      
    }
  
    return (
      <FlexGridItem>
        <h3>Approve Tokens</h3>
        <div>
          <div className={css({display: "flex", margin: "1rem 0"})}>
            <Label>📨 To Address:</Label>
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
          <Button onClick={onSubmit}>Approve</Button>
        </div>
      </FlexGridItem>
    )
  }
  
  export default Approval