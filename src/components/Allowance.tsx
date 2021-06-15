import React, { useState, useEffect } from 'react';
import {Input} from 'baseui/input';
import { Button } from 'baseui/button';
import {styled, useStyletron} from 'baseui';
import {FlexGridItem} from 'baseui/flex-grid';

const Label = styled('label', {
  width: "200px"
})

function Allowance(props) {
    const [css, theme] = useStyletron();
    const [owner, setOwner] = useState('')
    const [spender, setSpender] = useState('')
  
    const onSubmit = () => {
      props.onRequestAllowance(owner, spender);
    }
  
    return (
      <FlexGridItem>
        <h3>Get Allowance</h3>
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
              <Label>📨 Spender Address:</Label>
              <Input
                  value={spender}
                  onChange={ e => setSpender(e.currentTarget.value)}
                  placeholder="0x.."
                  overrides={{
                  Root: {
                      style: {

                      },
                  },
                  }}
              />
            </div>          
            <p>Allowance: {props.allowance}</p>
            <Button onClick={onSubmit}>Get Allowance</Button>
        </div>
      </FlexGridItem>
    )
  }
  
  export default Allowance