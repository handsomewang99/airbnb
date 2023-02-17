import styled from "styled-components";


export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  //margin-top: 30px;


    
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
  

  .MuiPaginationItem-icon {
    font-size: 20px;
  }

  .MuiPaginationItem-page{
    margin: 0 9px;

    &:hover {
      text-decoration: underline;
    }
  }

  .MuiPaginationItem-page.Mui-selected {
    background-color: #222;
    color: #fff;

    &:hover {
      background-color: #222;
    }
  }
  .desc{
    margin-top: 16px;
    color: #222;
  }
}
`