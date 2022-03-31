import { Container } from "../components/container"
import { HomePageNotLoggedIn } from "../components/homePage/homePageLoggedOut"
import { HomePageLoggedIn } from "../components/homePage/homePageLoggedIn"
import { useMeQuery } from "../generated/graphql"
import { withApollo } from "../utils/withApollo"
import { Onboarding } from "../components/homePage/onboarding"

const Index = () => {
  
  const {data} = useMeQuery() 
  let body = null;
  
  if (!data?.me)//if user is not logged in
  {
    body = <HomePageNotLoggedIn/>
  }
  else if (!data?.me.currentWeight)//if user has not completed onboarding
  {
    body = <Onboarding/>
  }
  else//user is logged in
  {
    body = <HomePageLoggedIn data={data.me}/>
  }

  return (
    <Container height="100%">
      {body}
    </Container>
  )
}

export default withApollo({ssr: true})(Index);