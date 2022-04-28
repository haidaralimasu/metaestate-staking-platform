import React from 'react';
import hero from '../../images/hero.svg'
import {
	ServicesContainer,
	ServicesWrapper,
	ServicesCard,
	ServicesIcon,
	ServicesH2,
	ServicesP
} from './CardElements.js'

import { Button } from '../../globalStyles'

const Card = (props) => {
  return (


    <ServicesWrapper>

    <ServicesCard>
    	<ServicesIcon src={hero} />
    	<ServicesH2>lorem ipsum</ServicesH2>
    	<ServicesP>lorem ipsum dolar sit emmet</ServicesP>
    	<Button style={{marginTop: "20px"}} >Buy</Button>
    </ServicesCard>

       <ServicesCard>
    	<ServicesIcon src={hero} />
    	<ServicesH2>lorem ipsum</ServicesH2>
    	<ServicesP>lorem ipsum dolar sit emmet</ServicesP>
    	<Button style={{marginTop: "20px"}} >Buy</Button>
    </ServicesCard>


       <ServicesCard>
    	<ServicesIcon src={hero} />
    	<ServicesH2>lorem ipsum</ServicesH2>
    	<ServicesP>lorem ipsum dolar sit emmet</ServicesP>
    	<Button style={{marginTop: "20px"}} >Buy</Button>
    </ServicesCard>



       <ServicesCard>
    	<ServicesIcon src={hero} />
    	<ServicesH2>lorem ipsum</ServicesH2>
    	<ServicesP>lorem ipsum dolar sit emmet</ServicesP>
    </ServicesCard>


       <ServicesCard>
    	<ServicesIcon src={hero} />
    	<ServicesH2>lorem ipsum</ServicesH2>
    	<ServicesP>lorem ipsum dolar sit emmet</ServicesP>
    </ServicesCard>

    </ServicesWrapper>


  )
}

export default Card;