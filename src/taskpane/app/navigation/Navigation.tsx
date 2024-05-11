import React from "react";
import { Main } from "../../pages/main";
import { TemplateMain } from "../../shared/templates";

const Navigation: React.FC = () => {
  return (
    <TemplateMain>
      <Main />
    </TemplateMain>
    // <ThemeProvider theme={theme}>
    //   <HashRouter>
    //     <Routes>
    //       <Route element={<TemplateMain />}>
    //         <Route index element={<Main />} />
    //         <Route path="/profile" element={<Profile />} />
    //         <Route path="/support" element={<Support />} />
    //         <Route path="/pricing" element={<Pricing />} />
    //         <Route path="/signin" element={<SignIn />} />
    //         <Route path="*" element={<Page404 />} />
    //       </Route>
    //     </Routes>
    //   </HashRouter>
    // </ThemeProvider>
  );
};

export default Navigation;
