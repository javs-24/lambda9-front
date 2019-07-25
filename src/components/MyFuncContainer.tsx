import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';
import { RouteComponentProps } from 'react-router-dom';
import LogContainer from './LogContainer';
import styled from 'styled-components';
import { Statistic } from 'antd';
import { GetGraphData } from '../graphql/graphql';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import InvocationGraph from './MyFuncContainer/InvocationGraph';

type TParams = { func: string };

function MyFuncContainer({ match }: RouteComponentProps<TParams>) {
  const [func, setFunction] = useState({});
  const filtered = useContext(MyContext).state.functions.filter(ele => {
    return ele.name === match.params.func;
  })[0];

  useEffect(() => {
    async function getData() {
      try {
        const graphData = await API.graphql(
          graphqlOperation(GetGraphData, { id: filtered.id })
        ).then(response => {
          console.log(' i am in response');
          console.log('response:', response);
          console.log(
            'response invocationData:',
            response.data.getFunction.invocationData
          );
          setFunction(response.data.getFunction.invocationData);
        });
      } catch (e) {
        console.log('errrroorr:', e);
      }
    }
    getData();
  }, []);


  return (
    <StyledContainer>
      <Row>
        <p>
          <span className='function-name'>{filtered.name}</span> from project{' '}
          <strong>{filtered.projectName}</strong>
        </p>
      </Row>

      <div style={{ fontSize: '16px', color: 'black', fontWeight: 'bold' }}>
        Overview
      </div>
      <InvocationContainer>
        <StatsStyled>
          <Statistic title="Total Invocations" value={filtered.numInvocations} />
          <Statistic title="Total Errors" value={filtered.numErrors} />
        </StatsStyled>
        <Graph>
          Invocation Over Time
            <InvocationGraph graphData={func} />
        </Graph>
      </InvocationContainer>
      <LogContainer logs={filtered} />
    </StyledContainer>
  );
}


const Row = styled.div`
  display: flex;
  font-size: 20px;
  .function-name {
    font-family: 'Roboto Mono', 'Courier', 'Helvetica';
    background: #01172c;
    padding: 0.25rem;
    border-radius: 7px;
    color: salmon;
  }
`;
const InvocationContainer = styled.div`
  display: flex;
  color: dodgerblue;
  // padding: 20px;
  background: #f5f5f5;
`;
const Invocation = styled.div`
  margin: 5px;
`;
const StatsStyled = styled.div`
  flex: 1
`
const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  padding: 10px;
`;
const Graph = styled.div`
flex: 2
`

export default MyFuncContainer;
