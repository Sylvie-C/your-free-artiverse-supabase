import { useTranslations } from "next-intl"


export default function Dropdown () {

  const t = useTranslations("SignupForm")

  return (
    <select name="category" id="category" className="col-span-2 rounded-md px-2 mx-2">
      <option value=""></option>
      <option value="music">{t("cat-website")}</option>
      <option value="music">{t("cat-music")}</option>
      <option value="painting">{t("cat-painting")}</option>
      <option value="drawing">{t("cat-drawing")}</option>
      <option value="sculpture">{t("cat-sculpture")}</option>
      <option value="digital">{t("cat-digital")}</option>
      <option value="photo">{t("cat-photo")}</option>
      <option value="literature">{t("cat-literature")}</option>
      <option value="crafts">{t("cat-crafts")}</option>
      <option value="applied">{t("cat-applied")}</option>
      <option value="perform">{t("cat-perform")}</option>
      <option value="graphic">{t("cat-graphic")}</option>
      <option value="miscellaneous">{t("cat-miscellaneous")}</option>
    </select>
  )
}