import React from "react";
import styled, { css } from "styled-components";
import { Box, Text, Image, Anchor, Button } from "grommet";
import Grid from "../Grid";
import Column from "../Column";
import teamMembers from "./teamMembers";

import twitter from "../../images/team-social/twitter.svg";
import instagram from "../../images/team-social/instagram.svg";
import linkedin from "../../images/team-social/linkedin.svg";
import favourite from "../../images/team-social/favourite.svg";
import globe from "../../images/team-social/globe.svg";
import github from "../../images/team-social/github.svg";

const MemberImageContainer = styled(Box)`
  padding-bottom: 100%;
  position: relative;
  border-radius: 20px;

  ${props =>
    css`
      background-image: url("${props.src}");
      background-size: cover;
      background-position: center center;
    `}

  :hover div {
    display: block;
  }
`;

const MemberImageLayover = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fcba59;
  border-radius: 20px;
  display: none;
`;

const Member = ({ member }) => {
  const getSocialIcon = socialLink => {
    if (socialLink.includes("linkedin")) return <Image src={linkedin} />;
    else if (socialLink.includes("twitter")) return <Image src={twitter} />;
    else if (socialLink.includes("instagram")) return <Image src={instagram} />;
    else if (socialLink.includes("github")) return <Image src={github} />;
    return <Image src={globe} />;
  };

  return (
    <Box gap="medium">
      <MemberImageContainer src={member.image}>
        {/*<Image*/}
        {/*  src={member.image}*/}
        {/*  style={{*/}
        {/*    borderRadius: "20px"*/}
        {/*  }}*/}
        {/*/>*/}
        <MemberImageLayover>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50% , -50%)",
              textAlign: "center"
            }}
          >
            <Text textAlign="center" color="white" weight={500}>
              {member.description}
            </Text>
          </Box>
        </MemberImageLayover>
      </MemberImageContainer>

      <Box direction="row" justify="between">
        <Text truncate>{member.name}</Text>
        <Box direction="row" gap="small">
          {member.social && (
            <Anchor href={member.social} target="_blank">
              {getSocialIcon(member.social)}
            </Anchor>
          )}
          <Anchor href={member.link} target="_blank">
            <Image src={favourite} />
          </Anchor>
        </Box>
      </Box>
    </Box>
  );
};

const Team = () => {
  return (
    <Box>
      <Box align="center" gap="small">
        <Text
          size="xxlarge"
          weight={500}
          textAlign="center"
          style={{ lineHeight: "50px" }}
        >
          Who is building Centrifuge?
        </Text>
        <Text size="20px" color="dark-4" weight={500}>
          Contributors
        </Text>
      </Box>
      <Grid mt="large" mb="large" gap="36">
        {teamMembers
          .sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })
          .map(member => (
            <Column
              span={{ small: 6, large: 3, medium: 4 }}
              justifySelf="stretch"
              margin={{ bottom: "medium" }}
            >
              <Member member={member} />
            </Column>
          ))}
      </Grid>
      {/* button should be of the color: #F44E72 */}
      <Button primary alignSelf="center" label="work with us" href="/careers" />
    </Box>
  );
};

export default Team;
