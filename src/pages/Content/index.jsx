import { Skeleton } from "@material-ui/lab";
import PageWrapper from "../../components/PageWrapper";


const Content = () => {

  return (
    <PageWrapper>
      <div id="content">
        <Skeleton variant="rectangular" width={210} height={118}/>
      </div>
    </PageWrapper>
  );
};

export default Content;
