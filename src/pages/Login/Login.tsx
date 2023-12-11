import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm.tsx';
import cls from '@/pages/Login/Login.module.scss';

export const Login = () => {
  return (
    <PageTemplate pageTitle="Login">
      <div className={cls.wrapper}>
        <div className={cls.content}>
          <div className={cls.info}>
            <p>
              To log in get registered
              <a href="https://social-network.samuraijs.com/" target="_blank" rel="noreferrer">
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </PageTemplate>
  );
};
