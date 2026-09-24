"use client";

import { useState, type FormEvent } from "react";

export function BookingForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [valid, setValid] = useState(false);
  const [prepared, setPrepared] = useState(false);
  function validate(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const name = form.elements.namedItem("parent") as HTMLInputElement;
    const child = form.elements.namedItem("child") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    name.setCustomValidity(name.value.trim() ? "" : "Укажите ваше имя");
    child.setCustomValidity(child.value.trim() ? "" : "Укажите имя ребёнка");
    const digits = phone.value.replace(/\D/g, "");
    phone.setCustomValidity(/^[+\d\s()-]+$/.test(phone.value) && digits.length >= 8 && digits.length <= 15 ? "" : "Укажите телефон: от 8 до 15 цифр");
    setValid(Array.from(form.elements).every((field) => !(field instanceof HTMLInputElement) || field.validity.valid));
    setErrors((current) => Object.fromEntries(Object.keys(current).map((key) => {
      const field = form.elements.namedItem(key) as HTMLInputElement;
      return [key, field.validationMessage];
    })));
    setPrepared(false);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const body = `Имя родителя: ${String(data.get("parent")).trim()}\nИмя ребёнка: ${String(data.get("child")).trim()}\nВозраст: ${data.get("age") || "не указан"}\nТелефон: ${data.get("phone")}\nСогласие на обработку данных: да`;
    window.location.href = `mailto:school_bratsk@mail.ru?subject=${encodeURIComponent("Запись на пробное занятие")}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <form className="booking-form" onInput={validate} onSubmit={submit} onBlur={(event) => {
    const field = event.target;
    if (field instanceof HTMLInputElement) setErrors((current) => ({ ...current, [field.name]: field.validationMessage }));
  }}>
    <p>Познакомимся с ребёнком и подберём подходящую программу.</p>
    <label>Ваше имя<input name="parent" aria-invalid={!!errors.parent} aria-describedby={errors.parent ? "booking-parent-error" : undefined} autoComplete="name" required maxLength={100} />{errors.parent && <small className="booking-error" id="booking-parent-error">{errors.parent}</small>}</label>
    <div className="booking-fields"><label>Имя ребёнка<input name="child" aria-invalid={!!errors.child} aria-describedby={errors.child ? "booking-child-error" : undefined} autoComplete="off" required maxLength={100} />{errors.child && <small className="booking-error" id="booking-child-error">{errors.child}</small>}</label><label>Возраст<input name="age" aria-invalid={!!errors.age} aria-describedby={errors.age ? "booking-age-error" : undefined} type="number" min="1" max="18" />{errors.age && <small className="booking-error" id="booking-age-error">{errors.age}</small>}</label></div>
    <label>Телефон<input name="phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "booking-phone-error" : undefined} type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" required maxLength={30} />{errors.phone && <small className="booking-error" id="booking-phone-error">{errors.phone}</small>}</label>
    <label className="booking-consent"><input name="consent" type="checkbox" required />Согласен на обработку персональных данных для записи на занятие</label>
    <button className="button button-primary" type="submit" disabled={!valid}>Продолжить в почте <span aria-hidden="true">→</span></button>
    <p className="booking-note" role="status">{prepared ? "Письмо подготовлено. Отправьте его из почтовой программы. Если она не открылась, позвоните нам." : "Откроется почтовая программа с заполненной заявкой — останется отправить письмо."}</p>
    <a className="booking-phone" href="tel:+73953283344">+7 (3953) 28-33-44</a>
  </form>;
}
