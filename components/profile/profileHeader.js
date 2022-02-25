import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useAppContext } from 'context/Store';
import { FaUserCircle, FaTv, FaGlobe, FaLaptopCode, FaLaptop, FaYoutube, FaTwitter, FaFacebook, FaLinkedinIn, FaLinkedin, FaInstagram, FaReddit, FaGithub } from 'react-icons/fa';
import { toast } from "react-toastify";
import Image from "next/image";
import api from "@/utils/api";
import axios from 'axios';
import { updateUserForm, createUpdateProfileForm } from '@/utils/formDataServices';
import { ControlGroup, ControlGroupFileUpload } from '../UI/FormControlGroup';
import ProfileField from './profileField';

const ProfileHeader = () => {
  const { state, dispatch } = useAppContext();
  const { profile } = state;

  return (
    <section>
      <div className="profile__socials-wrapper">
        <div className="profile__socials">
          {profile && profile?.profileData?.social?.website && (
            <a className="profile__social" href={profile?.profileData?.social?.website} target="_blank" rel="noopener noreferrer">
              <FaLaptopCode />
            </a>
          )}
          {profile && profile?.profileData?.social?.youtube && (
            <a className="profile__social" href={profile?.profileData?.social?.youtube} target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          )}
          {profile && profile?.profileData?.social?.facebook && (
            <a className="profile__social" href={profile?.profileData?.social?.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          )}
          {profile && profile?.profileData?.social?.twitter && (
            <a className="profile__social" href={profile?.profileData?.social?.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          )}
          {profile && profile?.profileData?.social?.instagram && (
            <a className="profile__social" href={profile?.profileData?.social?.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          )}
          {profile && profile?.profileData?.social?.linkedin && (
            <a className="profile__social" href={profile?.profileData?.social?.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          )}
          {profile && profile?.profileData?.social?.reddit && (
            <a className="profile__social" href={profile?.profileData?.social?.reddit} target="_blank" rel="noopener noreferrer">
              <FaReddit />
            </a>
          )}
          {profile && profile?.profileData?.social?.github && (
            <a className="profile__social" href={profile?.profileData?.social?.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
export default ProfileHeader;