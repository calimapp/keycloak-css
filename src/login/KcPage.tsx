import { Suspense, lazy, useState } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import styles from "./KcPage.module.css"
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const [showCrawl, setShowCrawl] = useState(false);
    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                            <div style={{
                                backgroundColor: "rgb(253,208,8)",
                                color: "black",
                                textAlign: "center",
                                height: "5%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <span onClick={() => setShowCrawl(true)}>⚠</span> This system is dedicated for Galileo restricted usage.
                                Unauthorized user connection is forbidden.
                                All attempts are logged and lead to an investigation.
                            </div>
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                            {showCrawl && (
                                <>
                                <div className={styles.fade} onClick={() => setShowCrawl(false)}></div>
                                <section className={styles["star-wars"]} onClick={() => setShowCrawl(false)}>
                                    <div className={styles.crawl}>
                                    <div className="title">
                                        <h1 className={styles.title}>Galileo GMS</h1>
                                        <p>Episode II</p>
                                    </div>
                                    <p>
                                        It is a period of civil war. At the end of the iteration the Emporor Dark Chazal
                                        is asking each team to deliver the TAG.
                                    </p>
                                    <p>
                                        But rebel forces made up of Platform and Rtgw continue to fight
                                        against the elements.
                                    </p>
                                    </div>
                                </section>
                                </>
      )}
                            </div>
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
