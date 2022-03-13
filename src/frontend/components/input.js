import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { alpha } from '../theme/utils';
import useCombinedRefs from '../hooks/use-combined-refs';

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0;
  right: 10px;
  color: ${({ theme }) => theme.inputPlaceholderColor};
`;

const InputInner = React.forwardRef(({
  rows,
  ...rest
}, ref) =>
  rows
    // @ts-ignore
    ? <textarea {...rest} rows={rows} ref={ref} />
    : <input  {...rest} ref={ref} />
);

const StyledInput = styled(InputInner)`
  width: 100%;
  line-height: 1.4;
  background-color: ${({ theme }) => theme.inputBgColor};
  border-radius: 3px;
  font-size: 16px;
  padding: 15px 20px;
  color: ${({ theme }) => theme.inputColor};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  font-family: 'Montserrat', sans-serif;

  &:not(:placeholder-shown) + label{
    transform: translate(-3px, -30px) scale(0.9);
  }

  &::placeholder {
    opacity: 0;
  }

  transition: all .2s ease;
`;

const InputWrapper = styled.div`
  position: relative;
  label {
    cursor: text;
    transition: all 0.2s;
    transform-origin: left bottom;
    display: inline-block;
    padding: 2px 3px;
    color: ${({ theme }) => theme.inputPlaceholderColor};
    font-family: font-family: 'Montserrat', sans-serif;
    position: absolute;
    left: 20px;
    top: 15px;
    color: ${({ theme }) => theme.inputPlaceholderColor};
    background-color: ${({ theme }) => theme.inputBgColor};
  }

  ${StyledInput} {
    ${({ theme, focus }) => focus && `
      border-color: ${theme.colors.primary.base};
      box-shadow: 0 0 0 4px ${alpha(theme.colors.primary.base, .1)};
    `}
    ${({ theme, error }) => error && `
      border-color: ${theme.colors.danger.base};
      box-shadow: 0 0 0 4px ${alpha(theme.colors.danger.base, .1)};
    `}
  }

  label {
    ${({ theme, focus }) => focus && `
        transform: translate(-3px, -25px) scale(0.9);
        color: ${theme.colors.primary.base};
    `}

    ${({ theme, error }) => error && `
      color: ${theme.colors.danger.base};
    `}
  }

  ${InputIcon} {
    ${({ theme, focus }) => focus && `
      color: ${theme.colors.primary.base};
    `}

    ${({ theme, error }) => error && `
      color: ${theme.colors.danger.base};
    `}
  }
`;

const Error = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger.base};
  margin-top: 5px;
`;

const Input = React.forwardRef(({
  icon,
  name,
  value,
  defaultValue,
  placeholder,
  className,
  onIconClick,
  onChange,
  onFocus,
  onBlur,
  error = false,
  errorText = 'Invalid property value',
  type = 'text',
  rows
}, forwardedRef) => {
  const [focus, setFocus] = useState(false);
  const innerRef = useRef(null);
  const ref = useCombinedRefs(innerRef, forwardedRef);

  const forceFocus = () => ref.current.focus();

  const handleFocus = (e) => {
    setFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleIconClick = (e) => {
    if (onIconClick) {
      onIconClick(e);
    }
  };

  return (
    <div className={className}>
      <InputWrapper
        onClick={() => forceFocus()}
        focus={focus}
        error={error}
      >
        <StyledInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          rows={rows}
          name={name}
          type={type}
          placeholder={placeholder}
          {...(typeof value !== 'undefined' && { value })}
          {...(typeof defaultValue !== 'undefined' && { defaultValue })}
          {...(onChange && { onChange })}
          autoComplete="off"
        />
        <label>{placeholder}</label>
        {icon && (
          <InputIcon
            onClick={handleIconClick}
          >
            {icon}
          </InputIcon>
        )}
      </InputWrapper>
      {error && <Error>{errorText}</Error>}
    </div>
  );
});

export default Input;
