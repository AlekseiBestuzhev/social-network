import { Component, createRef } from 'react';

import classNames from 'classnames';

import cls from '@/components/Modal/Modal.module.scss';
import { Portal } from '@/components/Modal/Portal/Portal.tsx';

type ModalPropsType = {
  children: React.ReactNode;
  onClose: () => void;
  opened: boolean;
};

type StateType = {
  mounted: boolean;
  mountingDone: boolean;
};

export class Modal extends Component<ModalPropsType, StateType> {
  private timerRefAppear: any;

  private timerRefClose: any;

  constructor(props: ModalPropsType) {
    super(props);
    this.timerRefAppear = createRef<any>();
    this.timerRefClose = createRef<any>();
    this.state = {
      mounted: false,
      mountingDone: false,
    };
  }

  componentDidUpdate(prevProps: Readonly<ModalPropsType>) {
    if (prevProps.opened !== this.props.opened) {
      if (this.props.opened) {
        this.setState({ mounted: true });
        this.timerRefAppear.current = setTimeout(() => {
          this.setState({ mountingDone: true });
        }, 30); // delay to separate rendering because of batching
      } else {
        this.setState({ mountingDone: false });
        this.timerRefClose.current = setTimeout(() => {
          this.setState({ mounted: false });
        }, 300);
      }
    }
  }

  componentWillUnmount() {
    if (this.timerRefAppear.current) {
      clearTimeout(this.timerRefAppear.current);
    }
    if (this.timerRefClose.current) {
      clearTimeout(this.timerRefClose.current);
    }
  }

  closeHandler() {
    this.props.onClose();
  }

  render() {
    const bcgStyles = classNames(cls.background, { [cls.bcgActive]: this.state.mountingDone });
    const wndStyles = classNames(cls.window, { [cls.wndActive]: this.state.mountingDone });

    if (!this.state.mounted) return null;

    return (
      <Portal>
        <div className={cls.modalWrapper}>
          <div className={bcgStyles} onClick={this.closeHandler.bind(this)} />
          <div className={wndStyles}>{this.props.children}</div>
        </div>
      </Portal>
    );
  }
}
