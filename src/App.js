import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import BoardListPage from './pages/boardlist';
import MyPage from './pages/my';
import NotiPage from './pages/noti';
import MailPage from './pages/mail';
import BoardPage from './pages/board';
import ViewPostPage from './pages/viewpost';
import WritePage from './pages/write';
import NotFound from "./pages/NotFound";
import SignUpPage from "./pages/signup";
import Board2Page from "./pages/board2";
import WriteMailPage from "./pages/writemail";
import GradePage from "./pages/grade";
import PrivacyPage from "./pages/privacy";
import ServiceAgreement from "./pages/serviceagreement"
import ServerNotiPage from "./pages/notipage"
import ViewNotiPage from "./pages/viewnoti"
import MockExamPage from "./pages/MockExam"
import ReportCardPage from "./pages/reportcard"
import Withdrawal from './pages/withdrawal'

function App() {
  return (
    <>
      <Router>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/signup' exact component={SignUpPage} />
        <Route path='/boardlist' exact component={BoardListPage} />
        <Route path='/board/grade' exact component={GradePage} />
        <Route path='/board/10' exact component={ServerNotiPage} />
        <Route path='/board/:category' component={BoardPage} />
        <Route path='/board2/:category' component={Board2Page} />
        <Route path='/noti' exact component={NotiPage} />
        <Route path='/my' exact component={MyPage} />
        <Route path='/mail' exact component={MailPage} />
        <Route path='/ViewPost/:postId' component={ViewPostPage} />
        <Route path='/ViewNoti/:postId' component={ViewNotiPage} />
        <Route path='/write/10' component={NotFound} />
        <Route path='/write/:category' component={WritePage} />
        <Route path='/writemail' component={WriteMailPage} />
        <Route path='/page/privacy' component={PrivacyPage} />
        <Route path='/page/serviceagreement' component={ServiceAgreement} />
        <Route path='/study/mockexam' component={MockExamPage} />
        <Route path='/study/report' component={ReportCardPage} />
        <Route path='/my/withdrawal' component={Withdrawal}/>
        <Route path={"*"} component={NotFound}/>
       </Switch>
      </Router>
    </>
  );
}

export default App;
