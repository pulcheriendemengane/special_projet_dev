from flask import Flask, render_template, request
import smtplib
from email.message import EmailMessage


#Création de l'application Flask
app = Flask(__name__)

# Route de la page d'accueil (affiche le formulaire de contact)
# Page contact
@app.route('/')
def home():
    return render_template('contact.html')

# Route qui reçoit les données du formulaire
@app.route('/contact', methods=['POST'])
def contact():

    # Récupération des données envoyées par le formulaire HTML
    nom = request.form['nom']
    prenom = request.form['prenom']
    mail = request.form['mail']

    # .get() permet d'éviter une erreur si le champ téléphone est vide
    telephone = request.form.get('telephone', '')

    message = request.form['message']

    # Création du contenu HTML du mail
    html_content = f"""
    <h2>Nouveau message reçu 💌</h2>
    <p><strong>Nom :</strong> {nom} {prenom}</p>
    <p><strong>Email :</strong> {mail}</p>
    <p><strong>Téléphone :</strong> {telephone}</p>
    <hr>
    <p><strong>Message :</strong></p>
    <p>{message}</p>
    """

    # Création de l'objet email
    msg = EmailMessage()

    # Sujet du mail
    msg['Subject'] = 'Nouveau message depuis le site'

    # Adresse expéditeur et destinataire
    msg['From'] = 'pulcheriendemengane@gmail.com'
    msg['To'] = 'pulcheriendemengane@gmail.com'

    # Ajout du contenu HTML dans le mail
    msg.add_alternative(html_content, subtype='html')

    # Tentative d'envoi du mail
    try:
        # Connexion au serveur SMTP de Gmail
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:

            # Activation du chiffrement pour sécuriser la connexion
            smtp.starttls()

            # Connexion avec un mot de passe d'application Google (obligatoire)
            smtp.login('ton.email@gmail.com', 'mot_de_passe_application')

            # Envoi du mail
            smtp.send_message(msg)

        # Message affiché si l'envoi réussit
        confirmation = "Message envoyé avec succès ! Merci pour ton message 💌"

    # Si une erreur se produit pendant l'envoi du mail
    except Exception as e:
        print(e)
        confirmation = "Une erreur est survenue. Réessaie plus tard."

    # Recharge la page contact avec le message de confirmation
    return render_template('contact.html', confirmation=confirmation)


# Lancement du serveur Flask en mode développement
if __name__ == '__main__':
    app.run(debug=True)