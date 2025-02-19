// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  Box,
  InputAdornment,
  LinearProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { Button } from "mds";
import { Theme, useTheme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import { loginStrategyType } from "./types";
import LogoutIcon from "../../icons/LogoutIcon";
import RefreshIcon from "../../icons/RefreshIcon";
import MainError from "../Console/Common/MainError/MainError";
import {
  ConsoleLogo,
  DocumentationIcon,
  DownloadIcon,
  LockIcon,
  MinIOTierIconXs,
  OperatorLogo,
} from "../../icons";
import { spacingUtils } from "../Console/Common/FormComponents/common/styleLibrary";
import CssBaseline from "@mui/material/CssBaseline";
import { SupportMenuIcon } from "../../icons/SidebarMenus";
import GithubIcon from "../../icons/GithubIcon";
import clsx from "clsx";
import Loader from "../Console/Common/Loader/Loader";
import { AppState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import {
  doLoginAsync,
  getFetchConfigurationAsync,
  getVersionAsync,
} from "./loginThunks";
import { resetForm, setJwt } from "./loginSlice";
import StrategyForm from "./StrategyForm";
import { LoginField } from "./LoginField";
import DirectPVLogo from "../../icons/DirectPVLogo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    },
    submit: {
      margin: "30px 0px 8px",
      height: 40,
      width: "100%",
      boxShadow: "none",
      padding: "16px 30px",
    },
    loginSsoText: {
      fontWeight: "700",
      marginBottom: "15px",
    },
    ssoSelect: {
      width: "100%",
      fontSize: "13px",
      fontWeight: "700",
      color: "grey",
    },
    ssoMenuItem: {
      fontSize: "15px",
      fontWeight: "700",
      color: theme.palette.primary.light,
      "&.MuiMenuItem-divider:last-of-type": {
        borderBottom: "none",
      },
      "&.Mui-focusVisible": {
        backgroundColor: theme.palette.grey["100"],
      },
    },
    ssoLoginIcon: {
      height: "13px",
      marginRight: "25px",
    },
    ssoSubmit: {
      marginTop: "15px",
      "&:first-of-type": {
        marginTop: 0,
      },
    },
    separator: {
      marginLeft: 8,
      marginRight: 8,
    },
    linkHolder: {
      marginTop: 20,
      font: "normal normal normal 14px/16px Lato",
    },
    miniLinks: {
      margin: "auto",
      textAlign: "center",
      color: "#B2DEF5",
      "& a": {
        color: "#B2DEF5",
        textDecoration: "none",
      },
      "& .min-icon": {
        width: 10,
        color: "#B2DEF5",
      },
    },
    miniLogo: {
      marginTop: 8,
      "& .min-icon": {
        height: 12,
        paddingTop: 2,
        marginRight: 2,
      },
    },
    loginPage: {
      height: "100%",
      margin: "auto",
    },
    buttonRetry: {
      display: "flex",
      justifyContent: "center",
    },
    loginContainer: {
      flexDirection: "column",
      maxWidth: 400,
      margin: "auto",
      "& .right-items": {
        backgroundColor: "white",
        padding: 40,
      },
      "& .consoleTextBanner": {
        fontWeight: 300,
        fontSize: "calc(3vw + 3vh + 1.5vmin)",
        lineHeight: 1.15,
        color: theme.palette.primary.main,
        flex: 1,
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        margin: "auto",

        "& .logoLine": {
          display: "flex",
          alignItems: "center",
          fontSize: 18,
        },
        "& .left-items": {
          marginTop: 100,
          background:
            "transparent linear-gradient(180deg, #FBFAFA 0%, #E4E4E4 100%) 0% 0% no-repeat padding-box",
          padding: 40,
        },
        "& .left-logo": {
          "& .min-icon": {
            color: theme.palette.primary.main,
            width: 108,
          },
          marginBottom: 10,
        },
        "& .text-line1": {
          font: " 100 44px 'Lato'",
        },
        "& .text-line2": {
          fontSize: 80,
          fontWeight: 100,
          textTransform: "uppercase",
        },
        "& .text-line3": {
          fontSize: 14,
          fontWeight: "bold",
        },
        "& .logo-console": {
          display: "flex",
          alignItems: "center",

          "@media (max-width: 900px)": {
            marginTop: 20,
            flexFlow: "column",

            "& svg": {
              width: "50%",
            },
          },
        },
      },
    },
    "@media (max-width: 900px)": {
      loginContainer: {
        display: "flex",
        flexFlow: "column",

        "& .consoleTextBanner": {
          margin: 0,
          flex: 2,

          "& .left-items": {
            alignItems: "center",
            textAlign: "center",
          },

          "& .logoLine": {
            justifyContent: "center",
          },
        },
      },
    },
    loginStrategyMessage: {
      textAlign: "center",
    },
    loadingLoginStrategy: {
      textAlign: "center",
      width: 40,
      height: 40,
    },
    submitContainer: {
      textAlign: "right",
      marginTop: 30,
    },
    linearPredef: {
      height: 10,
    },
    retryButton: {
      alignSelf: "flex-end",
    },
    iconLogo: {
      "& .min-icon": {
        width: "100%",
      },
    },
    ...spacingUtils,
  })
);

export interface LoginStrategyRoutes {
  [key: string]: string;
}

export interface LoginStrategyPayload {
  [key: string]: any;
}

export const loginStrategyEndpoints: LoginStrategyRoutes = {
  form: "/api/v1/login",
  "service-account": "/api/v1/login/operator",
};

export const getTargetPath = () => {
  let targetPath = "/";
  if (
    localStorage.getItem("redirect-path") &&
    localStorage.getItem("redirect-path") !== ""
  ) {
    targetPath = `${localStorage.getItem("redirect-path")}`;
    localStorage.setItem("redirect-path", "");
  }
  return targetPath;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const jwt = useSelector((state: AppState) => state.login.jwt);
  const loginStrategy = useSelector(
    (state: AppState) => state.login.loginStrategy
  );
  const loginSending = useSelector(
    (state: AppState) => state.login.loginSending
  );
  const loadingFetchConfiguration = useSelector(
    (state: AppState) => state.login.loadingFetchConfiguration
  );

  const latestMinIOVersion = useSelector(
    (state: AppState) => state.login.latestMinIOVersion
  );
  const loadingVersion = useSelector(
    (state: AppState) => state.login.loadingVersion
  );
  const navigateTo = useSelector((state: AppState) => state.login.navigateTo);

  const directPVMode = useSelector((state: AppState) => state.login.isDirectPV);

  const isOperator =
    loginStrategy.loginStrategy === loginStrategyType.serviceAccount ||
    loginStrategy.loginStrategy === loginStrategyType.redirectServiceAccount;

  if (navigateTo !== "") {
    navigate(navigateTo);
    dispatch(resetForm());
  }

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(doLoginAsync());
  };

  useEffect(() => {
    if (loadingFetchConfiguration) {
      dispatch(getFetchConfigurationAsync());
    }
  }, [loadingFetchConfiguration, dispatch]);

  useEffect(() => {
    if (loadingVersion) {
      dispatch(getVersionAsync());
    }
  }, [dispatch, loadingVersion]);

  let loginComponent;

  switch (loginStrategy.loginStrategy) {
    case loginStrategyType.form: {
      loginComponent = <StrategyForm />;
      break;
    }
    case loginStrategyType.redirect:
    case loginStrategyType.redirectServiceAccount: {
      if (loginStrategy.redirect.length > 1) {
        loginComponent = (
          <React.Fragment>
            <div className={classes.loginSsoText}>Login with SSO:</div>
            <Select
              id="ssoLogin"
              name="ssoLogin"
              data-test-id="sso-login"
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = e.target.value as string;
                }
              }}
              displayEmpty
              className={classes.ssoSelect}
              renderValue={() => "Select Provider"}
            >
              {loginStrategy.redirect.map((r, idx) => (
                <MenuItem
                  value={r}
                  key={`sso-login-option-${idx}`}
                  className={classes.ssoMenuItem}
                  divider={true}
                >
                  <LogoutIcon className={classes.ssoLoginIcon} />
                  {loginStrategy.displayNames[idx]}
                </MenuItem>
              ))}
            </Select>
          </React.Fragment>
        );
      } else if (loginStrategy.redirect.length === 1) {
        loginComponent = (
          <div className={clsx(classes.submit, classes.ssoSubmit)}>
            <Button
              key={`login-button`}
              variant="callAction"
              id="sso-login"
              label={
                loginStrategy.displayNames &&
                loginStrategy.displayNames.length > 0
                  ? loginStrategy.displayNames[0]
                  : "Login with SSO"
              }
              onClick={() => (window.location.href = loginStrategy.redirect[0])}
              fullWidth
            />
          </div>
        );
      } else {
        loginComponent = (
          <div className={classes.loginStrategyMessage}>
            Cannot retrieve redirect from login strategy
          </div>
        );
      }
      break;
    }
    case loginStrategyType.serviceAccount: {
      loginComponent = (
        <React.Fragment>
          <form className={classes.form} noValidate onSubmit={formSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <LoginField
                  required
                  className={classes.inputField}
                  fullWidth
                  id="jwt"
                  value={jwt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setJwt(e.target.value))
                  }
                  name="jwt"
                  autoComplete="off"
                  disabled={loginSending}
                  placeholder={"Enter JWT"}
                  variant={"outlined"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.submitContainer}>
              <Button
                variant="callAction"
                id="do-login"
                disabled={jwt === "" || loginSending}
                label={"Login"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} className={classes.linearPredef}>
              {loginSending && <LinearProgress />}
            </Grid>
          </form>
        </React.Fragment>
      );
      break;
    }
    default:
      loginComponent = (
        <div style={{ textAlign: "center" }}>
          {loadingFetchConfiguration ? (
            <Loader className={classes.loadingLoginStrategy} />
          ) : (
            <React.Fragment>
              <div>
                <p style={{ color: "#000", textAlign: "center" }}>
                  An error has occurred
                  <br />
                  The backend cannot be reached.
                </p>
              </div>
              <div className={classes.buttonRetry}>
                <Button
                  onClick={() => {
                    dispatch(getFetchConfigurationAsync());
                  }}
                  icon={<RefreshIcon />}
                  iconLocation={"end"}
                  variant="regular"
                  id="retry"
                  label={"Retry"}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      );
  }

  let modeLogo = <ConsoleLogo />;

  if (directPVMode) {
    modeLogo = <DirectPVLogo />;
  } else if (isOperator) {
    modeLogo = <OperatorLogo />;
  }

  const hyperLink = isOperator
    ? "https://min.io/docs/minio/kubernetes/upstream/operations/install-deploy-manage/minio-operator-console.html?ref=con"
    : "https://min.io/docs/minio/linux/administration/minio-console.html?ref=con";

  const theme = useTheme();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainError />
      <div className={classes.loginPage}>
        <Grid
          container
          style={{
            maxWidth: 400,
            margin: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              background:
                "transparent linear-gradient(180deg, #FBFAFA 0%, #E4E4E4 100%) 0% 0% no-repeat padding-box",
              padding: 40,
              color: theme.palette.primary.main,
            }}
            sx={{
              marginTop: {
                md: 16,
                sm: 8,
                xs: 3,
              },
            }}
          >
            <Box className={classes.iconLogo}>{modeLogo}</Box>
            <Box
              style={{
                font: "normal normal normal 20px/24px Lato",
              }}
            >
              Multicloud Object Storage
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: "white",
              padding: 40,
              color: theme.palette.primary.main,
            }}
          >
            {loginComponent}
            <Box
              style={{
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <a
                href={hyperLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: theme.colors.link,
                  font: "normal normal normal 12px/15px Lato",
                }}
              >
                Learn more about {isOperator ? "OPERATOR CONSOLE" : "CONSOLE"}
              </a>
              <a
                href={hyperLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: theme.colors.link,
                  font: "normal normal normal 12px/15px Lato",
                  textDecoration: "none",
                  fontWeight: "bold",
                  paddingLeft: 4,
                }}
              >
                ➔
              </a>
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.linkHolder}>
            <div className={classes.miniLinks}>
              <a
                href="https://min.io/docs/minio/linux/index.html?ref=con"
                target="_blank"
                rel="noreferrer"
              >
                <DocumentationIcon /> Documentation
              </a>
              <span className={classes.separator}>|</span>
              <a
                href="https://github.com/minio/minio"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon /> Github
              </a>
              <span className={classes.separator}>|</span>
              <a
                href="https://subnet.min.io/?ref=con"
                target="_blank"
                rel="noreferrer"
              >
                <SupportMenuIcon /> Support
              </a>
              <span className={classes.separator}>|</span>
              <a
                href="https://min.io/download/?ref=con"
                target="_blank"
                rel="noreferrer"
              >
                <DownloadIcon /> Download
              </a>
            </div>
            <div className={clsx(classes.miniLinks, classes.miniLogo)}>
              <a
                href={"https://github.com/minio/minio/releases"}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <MinIOTierIconXs /> <b>Latest Version:</b>&nbsp;
                {!loadingVersion && latestMinIOVersion !== "" && (
                  <React.Fragment>{latestMinIOVersion}</React.Fragment>
                )}
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
